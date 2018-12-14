from numpy cimport ndarray
cimport numpy as np
cimport cython
from libc.stdlib cimport malloc, free
from cpython cimport array
import array
from cpython.string cimport PyString_AsString


cdef extern from "infer.h":
    int init(int argc, char * argv[])
    int infer(unsigned char * img, int size, float * probs)
    void nums(int * out, int size)


# https://stackoverflow.com/a/17511714
cdef char ** to_cstring_array(args):
    cdef char ** ret = <char **>malloc(len(args) * sizeof(char *))
    for i in range(len(args)):
        ret[i] = PyString_AsString(args[i])
    return ret


def cyinit(args):
    cdef char ** c_args = to_cstring_array(args)
    init(len(args), c_args)
    free(c_args)


def cyinfer(ndarray[np.uint8_t, ndim=1] img not None, ndarray[np.float64_t, ndim=1] probs not None):
    cdef float *cprobs = <float *> malloc(probs.size * sizeof(float))
    ret = infer(<unsigned char *>img.data, img.size, cprobs)
    for i in range(probs.size):
        probs[i] = cprobs[i]
    free(cprobs)
    return ret
    

def cynums(ndarray[np.int_t, ndim=1] out not None):
    cdef array.array cout = array.array('i', [0 for x in range(out.size)])
    nums(<int*>cout.data.as_voidptr, out.size)
    for i in range(out.size):
        out[i] = cout[i]


def cynums2(int size):
    cdef array.array cout = array.array('i', [0 for x in range(size)])
    nums(<int*>cout.data.as_voidptr, size)
    return cout
